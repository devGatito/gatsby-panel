const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				"@root": path.resolve(__dirname, ""),
				"@src": path.resolve(__dirname, "src"),
				"@seo": path.resolve(__dirname, "src/seo"),
				"@query": path.resolve(__dirname, "src/query"),
				"@layout": path.resolve(__dirname, "src/layout"),
				"@components": path.resolve(__dirname, "src/components"),
				"@middlewares": path.resolve(__dirname, "src/middlewares"),
				"@modules": path.resolve(__dirname, "src/modules"),
				"@assets": path.resolve(__dirname, "src/assets/images"),
				"@graphic": path.resolve(__dirname, "src/assets"),
				"@widgets": path.resolve(__dirname, "src/widgets"),
				"@documents": path.resolve(__dirname, "src/assets/documents"),
				"@storage": path.resolve(__dirname, "src/storage"),
				"@services": path.resolve(__dirname, "src/services"),
				"@constants": path.resolve(__dirname, "src/constants"),
				"@hooks": path.resolve(__dirname, "src/hooks"),
				"@utils": path.resolve(__dirname, "src/utils"),
			},
			fallback: {
				crypto: false,
				os: false,
				path: false,
				util: false,
				fs: false,
				constants: false,
				stream: false,
				assert: false,
			},
		},
	});
};
