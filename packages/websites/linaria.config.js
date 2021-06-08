// linaria 配置详见 https://github.com/callstack/linaria/blob/master/docs/CONFIGURATION.md#options
module.exports = {
  evaluate:false,
  rules: [
    {
      action: require("linaria/evaluators").shaker,
    },
    {
      test: /node_modules[\/\\](?!@tarojs)/,
      action: "ignore",
    },
  ],
};
