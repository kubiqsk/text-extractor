function findInnerTexts( position, texts, layers ){
	layers.forEach(function( sublayer ){
		if( sublayer.type == "text" ){
			var x = sublayer.rect.x;
			var y = sublayer.rect.y;
			var tempParent = sublayer.parent;
			while( tempParent ){
				x += tempParent.rect.x;
				y += tempParent.rect.y;
				tempParent = tempParent.parent;
			}
			if( x >= position.x && y >= position.y ){
				if( x < ( position.x + position.width ) && y < ( position.y + position.height ) ){
					if( texts[ y ] ){
						if( texts[ y ][ x ] ){
							texts[ y ][ x ].push( sublayer.content );
						}else{
							texts[ y ][ x ] = [ sublayer.content ];
						}
					}else{
						texts[ y ] = {};
						texts[ y ][ x ] = [ sublayer.content ];
					}
				}
			}
		}else if( sublayer.layers.length ){
			texts = findInnerTexts( position, texts, sublayer.layers );
		}
	});
	return texts;
}

function screen( context, selectedVersion, selectedScreen ){
	var texts = {};
	var tempStrings = [];
	var finalText = "";

	var yDivider = context.getOption("yDivider");
	yDivider = yDivider.replace( /\\n/g, "\n" ).replace( /\\t/g, "\t" );
	yDivider = ( yDivider && yDivider != "default" ) ? yDivider : "\n\n";

	var xDivider = context.getOption("xDivider");
	xDivider = xDivider.replace( /\\n/g, "\n" ).replace( /\\t/g, "\t" );
	xDivider = ( xDivider && xDivider != "default" ) ? xDivider : "\t";

	texts = findInnerTexts( selectedVersion.layers[0].rect, texts, selectedVersion.layers );

	for( const [ y, xs ] of Object.entries( texts ) ){
		tempStrings = [];
		for( const [ x, strings ] of Object.entries( xs ) ){
			tempStrings.push( strings.join("\n") );
		}
		finalText += tempStrings.join( xDivider ) + yDivider;
	}

	return {
		code: finalText,
		language: "text"
	};
}

function layer( context, layer ){
	var texts = {};
	var tempStrings = [];
	var finalText = "";

	var yDivider = context.getOption("yDivider");
	yDivider = yDivider.replace( /\\n/g, "\n" ).replace( /\\t/g, "\t" );
	yDivider = ( yDivider && yDivider != "default" ) ? yDivider : "\n\n";

	var xDivider = context.getOption("xDivider");
	xDivider = xDivider.replace( /\\n/g, "\n" ).replace( /\\t/g, "\t" );
	xDivider = ( xDivider && xDivider != "default" ) ? xDivider : "\t";

	var position = Object.assign( {}, layer.rect );
	var tempParent = layer.parent;
	while( tempParent ){
		position.x += tempParent.rect.x;
		position.y += tempParent.rect.y;
		tempParent = tempParent.parent;
	}

	texts = findInnerTexts( position, texts, layer.version.layers );

	for( const [ y, xs ] of Object.entries( texts ) ){
		tempStrings = [];
		for( const [ x, strings ] of Object.entries( xs ) ){
			tempStrings.push( strings.join("\n") );
		}
		finalText += tempStrings.join( xDivider ) + yDivider;
	}

	return {
		code: finalText,
		language: "text"
	};
}

export default {
	screen,
	layer
};