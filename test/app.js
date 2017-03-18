'use strict';

const path = require( 'path' ),
	helpers = require( 'yeoman-test' );

describe( 'generator-mlewand-node:app', function() {
	before( function() {
		return helpers.run( path.join( __dirname, '../generators/app' ) )
			.withPrompts( { license: 'MIT' } )
			.toPromise();
	} );
} );