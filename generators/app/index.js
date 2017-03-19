'use strict';

const Generator = require( 'yeoman-generator' ),
	extend = require( 'deep-extend' );

module.exports = class extends Generator {
	default() {
		this.composeWith( require.resolve( 'generator-node/generators/app' ), {
			editorconfig: false,
			githubAccount: 'mlewand',
			skipInstall: true,
			license: this.options.license || 'MIT',
			coveralls: false,
			babel: false
		} );

		this.composeWith( require.resolve( './../vscodeDebugging' ) );
	}

	writing() {
		this.fs.copy( this.templatePath( '**/.eslintrc' ), this.destinationPath() );
	}

	/*
	Haxes, haxes detected:
	I couldn't disable node:eslint task which was injecting eslint-config-xo-space dependency.
	Also my `writing` method was ran __before__ composite tasks` writing calls, so it was showing an empty file.
	As a result I had to hook up to a later priority.
	*/
	conflicts() {
		const pkg = this.fs.readJSON( this.destinationPath( 'package.json' ), {} ),
			generatorGeneratorPkg = require( '../../package.json' );

		// Remove eslint in package.json, it's better to keep it as a file.
		delete pkg.eslintConfig;

		// Couple of modules should be removed.
		if ( pkg.devDependencies ) {
			delete pkg.devDependencies[ 'eslint-config-xo-space' ];
		}

		extend( pkg, {
			devDependencies: {
				'eslint-config-mlewand-node': generatorGeneratorPkg.devDependencies[ 'eslint-config-mlewand-node' ]
			}
		} );

		pkg.keywords = pkg.keywords || [];

		this.fs.writeJSON( this.destinationPath( 'package.json' ), pkg );
	}

	install() {
		this.installDependencies( { bower: false } );
	}
};