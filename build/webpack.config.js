var path = require('path');
var webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(env = {}, argv){
  console.log("env", env);
  return {
    mode: 'production',
    entry: './src/_item.ts',
    output: {
      path: path.resolve(__dirname, '..', 'src'),
      filename: "item.ts"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".js"],
    /*   alias:{
        'mana-fever-utils':path.resolve(__dirname, '..', 'node_modules', 'mana-fever-utils')
      } */
    },
    module: {
      rules: [
        {
          test: /\.(t|j)s?$/,
        /*   include:[
            path.resolve(__dirname, '..', 'src'),
            path.resolve(__dirname, '..', 'node_modules', 'mana-fever-utils')
          ], */
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                configFile:path.resolve(__dirname, 'webpack.tsconfig.json')
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer:[
        new TerserPlugin({
          test: /\.(t|j)s$/i,
          terserOptions: {
            ecma: 2016,
            target: 'commonjs', //Eibriel
            warnings: false,
            parse: {
              ecma:2016
            },
            compress: {
              ecma:2016,
              defaults:false,
              arrows:true,
              arguments:true,
              booleans:true,
              booleans_as_integers:true,
              collapse_vars:true,
              comparisons:true,
              computed_props:true,
              conditionals:true,
              dead_code:true,
              directives:true,
              evaluate:true,
              expression:false,
              global_defs:{},
              hoist_funs:false,
              hoist_props:true,
              hoist_vars:false,
              if_return:true,
              inline:false,
              join_vars:true,
              keep_classnames:false,
              keep_fargs:false,
              keep_fnames:false,
              keep_infinity:false,
              loops:true,
              module:true,
              negate_iife:false,
              passes:1,
              drop_console:env.production?true:false,
              /* properties:true,
              pure_funcs:null, //[ Math.floor ] //TODO REVIEW MORE
              pure_getters:true,
              reduce_vars:true,
              sequences:true,
              side_effects:true,
              switches:true,
              toplevel:false */
            },
            mangle: {
              keep_classnames: false,
              //keep_quoted: false,
            }, // Note `mangle.properties` is `false` by default.
            module: true,
            output: {
              beautify:false,
              braces:false,
              comments:false,
              ecma:2016
            },
            toplevel: true,
            nameCache: null,
            ie8: false,
            keep_classnames: true,
            keep_fnames: false,
            keep_fargs: false, //Eibriel
            safari10: false,
          }
        }),
      ]
    },
    externals:{
      "@decentraland/EthereumController":"EthereumController",
      "@decentraland/EnvironmentAPI":"EnvironmentAPI",
      "@decentraland/web3-provider":"web3Provider",
      "@decentraland/Identity":"Identity",
      "@decentraland/RestrictedActions":"RestrictedActions",
      "@dcl/crypto-scene-utils":"cryptoSceneUtils",
      "@dcl/ecs-scene-utils":"ecsSceneUtils",
      "eth-connect":"EthConnect"
/*       "eth-connect":"eth-connect",
      "decentraland-transactions":"decentraland-transactions" */
    },
    plugins:[
      new webpack.DefinePlugin({
        __RESOURCE_BASE__:JSON.stringify("")
      }),
      new webpack.BannerPlugin({banner:`
      import * as Identity from "@decentraland/Identity";
      import * as EnvironmentAPI from "@decentraland/EnvironmentAPI";
      import * as web3Provider from "@decentraland/web3-provider";
      import * as EthereumController from "@decentraland/EthereumController";
      import * as RestrictedActions from "@decentraland/RestrictedActions";
      import * as cryptoSceneUtils from "@dcl/crypto-scene-utils";
      import * as ecsSceneUtils from "@dcl/ecs-scene-utils";
      import * as EthConnect from "eth-connect";

      export default
      `, raw:true, entryOnly:true}),

    //  new webpack.BannerPlugin({banner:`import { getUserData } from "@decentraland/Identity";import { getCurrentRealm } from "@decentraland/EnvironmentAPI";`, raw:true, entryOnly:true}),
/*       new BundleAnalyzerPlugin({
        generateStatsFile:true,
        analyzerMode:'static',
        logLevel:'info',

      }) */
    ]
  };
}
