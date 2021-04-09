function screen( context, selectedVersion, selectedScreen ){
	var texts = "";

	var stringsDivider = context.getOption('stringsDivider');
	stringsDivider = stringsDivider.replace( /\\n/g, "\n" );
	stringsDivider = ( stringsDivider && stringsDivider != 'default' ) ? stringsDivider : "\n----\n";

	selectedVersion.layers.forEach(function( layer ){
		if( layer.type == "text" ){
			texts += layer.content + stringsDivider;
		}
	});

	return {
		code: texts,
		language: 'text'
	};
}

export default {
	screen
};