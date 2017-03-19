'use strict';

const path = require( 'path' ),
	helpers = require( 'yeoman-test' ),
	yeomanAssert = require( 'yeoman-assert' );

describe( 'generator-mlewand-node:vscodeDebugging', function() {
	it( 'adds nothing when --vscodeDebug set to false', () => {
		return helpers.run( path.join( __dirname, '../generators/vscodeDebugging' ) )
			.withOptions( { vscodeDebug: false } )
			.then( () => {
				yeomanAssert.noFile( [ '.vscode/launch.json' ] );
			} );
	} );

	it( 'adds proper settings by default', () => {
		return helpers.run( path.join( __dirname, '../generators/vscodeDebugging' ) )
			.then( () => {
				yeomanAssert.file( [ '.vscode/launch.json' ] );
			} );
	} );
} );