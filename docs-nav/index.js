/**
 * Module dependencies.
 */

var logo = require('../wercker-logo');
var react = require('react');
var sticky = require('react-sticky');

var dom = react.DOM;
var logoFull = logo.full;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'nav',
  getDefaultProps: function () {
    const base = getWindowUrl();
    var data;

    switch (base) {
      case 'learn':
        data = 'learn';
        break;
      case 'docs':
        data = 'docs';
        break;
      case 'api':
        data = 'api';
        break;
      case 'quickstarts':
        data = 'quickstarts';
        break;
      case 'cli':
        data = 'cli';
        break;
    }

    return {data: data};
  },
  render: render,
  componentDidMount: componentDidMount
});

/**
 * Render.
 */

function render () {
  return sticky({stickyClass: 'navbar-floating', topOffset: 1},
    dom.div({className: 'flex-outer navbar-container'},
      dom.div({className: 'flex-inner'},
        dom.div({className: 'navbar-logo'},
          dom.a({
            className: 'logo-full',
            href: '/index.html',
            dangerouslySetInnerHTML: {
              __html: logoFull
            }
          })
        ),
        dom.div({className: 'navbar-signup'},
          dom.a({
            className: 'button-nav_signup',
            id: 'signup-nav-sub',
            href: 'https://app.wercker.com/users/new/',
            children: 'Sign up'
          }),
          dom.a({
            className: 'button-nav_login',
            id: 'nav-login',
            href: 'https://app.wercker.com/',
            children: 'Log in'
          })
        ),
        dom.ul({className: 'navbar'},
          dom.li(null,
            dom.a({
              className: 'navbar-item navbar-item_learn',
              href: '/learn/basics/introduction.html',
              children: 'Learn'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item navbar-item_quickstarts',
              href: '/quickstarts/index.html',
              children: 'Quickstarts'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item navbar-item_docs',
              href: '/docs/index.html',
              children: 'Docs'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item navbar-item_cli',
              href: '/cli/index.html',
              children: 'CLI'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item navbar-item_api',
              href: '/api/index.html',
              children: 'API'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item',
              href: 'http://blog.wercker.com',
              children: 'Blog'
            })
          )
        )
      )
    )
  );
}

// componentDidMount
function componentDidMount () {
  var navbarItem = document.querySelector('.navbar-item_' + this.props.data);
  if (navbarItem) navbarItem.classList.add('navbar-item_active');
}

// get the baseUrl from the window
// null -> str
function getWindowUrl () {
  var pathName = window.location.pathname.match(/\/\w+/);
  if (pathName) {
    return pathName[0].split('/')[1];
  }
  return '';
}
