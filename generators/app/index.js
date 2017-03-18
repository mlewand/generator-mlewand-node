'use strict';

const Generator = require( 'yeoman-generator' );

module.exports = class extends Generator {
	default() {
		this.composeWith( require.resolve( 'generator-node/generators/app' ), {
			editorconfig: false,
			githubAccount: 'mlewand',
			skipInstall: true
		} );
	}

	extendPackage() {
	}

	install() {
		this.installDependencies( { bower: false } );
	}
};