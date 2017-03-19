'use strict';

const path = require( 'path' ),
	helpers = require( 'yeoman-test' ),
	assert = require( 'assert' ),
	yoAssert = require( 'yeoman-assert' );

describe( 'generator-mlewand-node:app', function() {
	this.timeout( 5000 );

	describe( 'generator-node integration', function() {
		let pkg,
			tmpDir;

		before( () => helpers.run( path.join( __dirname, '../generators/app' ) )
			.withPrompts( { license: 'MIT' } )
			.inTmpDir()
			.then( dir => {
				tmpDir = dir;
				pkg = require( path.join( tmpDir, 'package.json' ) );
			} )
		);

		it( 'clears package.json produced by base generator', () => {
			assert.strictEqual( false, 'eslint-config-xo-space' in pkg.devDependencies, 'eslint-config-xo-space is not removed' );
		} );

		it( 'adds good stuff to package.json', () => {
			assert.strictEqual( true, 'eslint-config-mlewand-node' in pkg.devDependencies, 'eslint-config-mlewand-node was not added' );
		} );
	} );


	it( 'doesnt add AppVeyor if not needed', () => {
		return helpers.run( path.join( __dirname, '../generators/app' ) )
			.withPrompts( {
				license: 'MIT'
			} )
			.withOptions( {
				skipAppveyor: true
			} )
			.inTmpDir()
			.then( () => {
				return yoAssert.noFile( '.appveyor.yml' );
			} );
	} );
} );