var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var browserify = require('browserify');
var path = require('path');
var fs = require('fs');
var os = require('os');
var dts = require('dts-bundle');
var deleteEmpty = require('delete-empty');
var LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");

/* helper function to get into build directory */
var libPath = function (name) {
    if (undefined === name) {
        return 'dist';
    }

    return path.join('dist', name);
};

/* helper to clean leftovers */
var outputCleanup = function (dir, initial) {
    if (false == fs.existsSync(libPath())) {
        return;
    }

    if (true == initial) {
        console.log("Build leftover found, cleans it up.");
    }

    var list = fs.readdirSync(dir);
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if (filename == "." || filename == "..") {
            // pass these files
        } else if (stat.isDirectory()) {
            // outputCleanup recursively
            outputCleanup(filename, false);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};

/* precentage handler is used to hook build start and ending */
var percentage_handler = function handler(percentage, msg) {
    if (0 == percentage) {
        /* Build Started */
        outputCleanup(libPath(), true);
        console.log("Build started... Good luck!");
    } else if (1 == percentage) {
        // TODO: No Error detection. :(
        create_browser_version(webpack_opts.output.filename);

        // Invokes dts bundling
        console.log("Bundling d.ts files ...");
        dts.bundle(bundle_opts);

        // Invokes lib/ cleanup
        deleteEmpty(bundle_opts.baseDir, function (err, deleted) {
            if (err) {
                console.error("Couldn't clean up : " + err);
                throw err;
            } else {
                console.log("Cleanup " + deleted);
            }
        });
    }
};

var bundle_opts = {

    // Required

    name: 'oratio',
    main: 'src/main.d.ts',
    baseDir: 'src',
    out: '../dist/main.d.ts',
    externals: false,
    referenceExternals: false,
    exclude: /^defs\/$/,
    removeSource: true,
    newline: os.EOL,
    indent: '	',
    prefix: '__',
    separator: '/',
    verbose: false,
    emitOnIncludedFileNotFound: false,
    emitOnNoIncludedFileNotFound: false,
    outputAsModuleFolder: true
};

var webpack_opts = {
    entry: './src/main.ts',
    target: 'node',
    output: {
        filename: libPath('main.js'),
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            'node_modules',
            'src',
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    emitErrors: true,
                    failOnHint: true,
                    resourcePath: "src"
                }
            },
            {
                test: /\.ts$/,
                loaders: ['babel-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.json$/,
                loaders: 'json-loader'
            }
        ],
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProgressPlugin(percentage_handler),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                    resourcePath: "src"
                }
            }
        })

    ]
};

var create_browser_version = function (inputJs) {
    let outputName = inputJs.replace(/\.[^/.]+$/, "");
    outputName = `${outputName}.browser.js`;
    console.log("Creating browser version ...");

    let b = browserify(inputJs, {
        standalone: bundle_opts.name,
    });

    b.bundle(function (err, src) {
        if (err != null) {
            console.error("Browserify error:");
            console.error(err);
        }
    }).pipe(fs.createWriteStream(outputName));
};

module.exports = webpack_opts;
