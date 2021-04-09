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

	selectedVersion.layers.forEach(function( layer ){
		if( layer.type == "text" ){
			if( texts[ layer.rect.y ] ){
				if( texts[ layer.rect.y ][ layer.rect.x ] ){
					texts[ layer.rect.y ][ layer.rect.x ].push( layer.content );
				}else{
					texts[ layer.rect.y ][ layer.rect.x ] = [ layer.content ];
				}
			}else{
				texts[ layer.rect.y ] = {};
				texts[ layer.rect.y ][ layer.rect.x ] = [ layer.content ];
			}
		}
	});

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

	layer.version.layers.forEach(function( sublayer ){
		if( sublayer.type == "text" ){
			if( sublayer.rect.x >= layer.rect.x && sublayer.rect.y >= layer.rect.y ){
				if( sublayer.rect.x < ( layer.rect.x + layer.rect.width ) && sublayer.rect.y < ( layer.rect.y + layer.rect.height ) ){
					if( texts[ sublayer.rect.y ] ){
						if( texts[ sublayer.rect.y ][ sublayer.rect.x ] ){
							texts[ sublayer.rect.y ][ sublayer.rect.x ].push( sublayer.content );
						}else{
							texts[ sublayer.rect.y ][ sublayer.rect.x ] = [ sublayer.content ];
						}
					}else{
						texts[ sublayer.rect.y ] = {};
						texts[ sublayer.rect.y ][ sublayer.rect.x ] = [ sublayer.content ];
					}
				}
			}
		}
	});

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