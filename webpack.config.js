var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var browserify = require('browserify');
var path = require('path');
var fs = require('fs');
var os = require('os');
var dts = require('dts-bundle');
var deleteEmpty = require('delete-empty');

const name = 'oratio';

const typingBundleOptions = {
    name: name,
    main: 'src/main.d.ts',
    baseDir: 'src',
    out: '../dist/index.d.ts',
    externals: false,
    referenceExternals: false,
    exclude: /^defs\/$/,
    removeSource: true,
    newline: os.EOL,
    verbose: false,
    emitOnIncludedFileNotFound: false,
    emitOnNoIncludedFileNotFound: false,
    outputAsModuleFolder: true
};

const libPath = (name) => {
    if (name === undefined) {
        return 'dist';
    }

    return path.join('dist', name);
};

const percentageHandler = function handler(percentage) {
    if (percentage === 0) {
        outputCleanup(libPath(), true);
        console.log("Build started... Good luck!");
    } else if (percentage === 1) {
        createBrowserVersion(webpackOptions.output.filename);

        dts.bundle(typingBundleOptions);
        addModuleNameToTypings()

        deleteEmpty(typingBundleOptions.baseDir, function (err, deleted) {
            if (err) {
                console.error("Couldn't clean up : " + err);
                throw err;
            }
        });
    }
};

const webpackOptions = {
    entry: './src/main.ts',
    target: 'node',
    output: {
        filename: libPath('main.js'),
        libraryTarget: "umd",
        library: name
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
        new webpack.ProgressPlugin(percentageHandler),
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

const outputCleanup = (dir, initial) => {
    if (!fs.existsSync(libPath())) {
        return;
    }

    const list = fs.readdirSync(dir);
    for (var i = 0; i < list.length; i++) {
        const filename = path.join(dir, list[i]);
        const stat = fs.statSync(filename);

        if (filename === "." || filename === "..") {
        } else if (stat.isDirectory()) {
            outputCleanup(filename, false);
        } else {
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};


const createBrowserVersion = (inputJs) => {
    let outputName = inputJs.replace(/\.[^/.]+$/, "");
    outputName = `${outputName}.browser.js`;

    let b = browserify(inputJs, {
        standalone: typingBundleOptions.name,
    });

    b.bundle(function (err, src) {
        if (err != null) {
            console.error("Browserify error:");
            console.error(err);
        }
    }).pipe(fs.createWriteStream(outputName));
};

const addModuleNameToTypings = function () {
    fs.readFile("./dist/index.d.ts", (err, data) => {
        let dataString = data.toString();
        dataString = dataString.replace(/.*\n/, "declare namespace " + name + "  {\n")
        dataString += "}\n\n"
        dataString += "declare module \"" + name + "\" {\n"
        dataString += "\texport = " + name + ";\n"
        dataString += "}\n"
        fs.writeFile("./dist/index.d.ts", dataString, (err, data) => {
            if (err) {
                console.error("Couldn't add namespace to .d.ts: " + err);
                throw err;
            }
        });
    });
}

module.exports = webpackOptions;
