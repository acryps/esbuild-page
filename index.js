module.exports = {
	name: '@acryps/page',
	setup(build) {
		build.onLoad({ filter: /\.tsx$/ }, async (args) => {
			let source = await require('fs').promises.readFile(args.path, 'utf8');
			
			// replace accessors
			// // Component.accessor(() => (${value}), $value => { ${value} = $value; })
			source = source.replace(/(\$[a-zA-Z\-]+)=\{(.*)\}/g, (_, key, value) => `${key}={Component.accessor(() => (${value}), $value => { ${value} = $value; })}`);
			
			return {
				contents: source,
				loader: 'tsx'
			};
		});
	}
};
