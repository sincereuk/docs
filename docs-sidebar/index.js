const react = require('react');

const renderSimpleSidebar = require('./list-learn');
const docsToc = require('./toc-docs.json');
const apiToc = require('./toc-api.json');
const cliToc = require('./toc-cli.json');
const quickstartsToc = require('./toc-quickstarts.json');
const renderSearch = require('./search');

var dom = react.DOM;

module.exports = createClass;

// create react class
// null -> null
function createClass () {
  return react.createClass({
    displayName: 'sidebar',
    getDefaultProps: function () {
      const base = getWindowUrl();
      var data;

      switch (base) {
        case 'api':
          data = apiToc;
          break;
        case 'quickstarts':
          data = quickstartsToc;
          break;
        case 'cli':
          data = cliToc;
          break;
        default:
          data = docsToc;
      }

      return {data: data};
    },
    getInitialState: function () {
      return {data: this.props.data};
    },
    render: function render () {
      if (getWindowUrl() === 'learn') {
        return renderSimpleSidebar(this.state, this.props);
      }
      return renderSidebar(this.props, this.state, this.setState.bind(this));
    }
  });
}

// render the sidebar
// obj, obj, fn -> obj
function renderSidebar (props, state, setState) {
  var currentSection = getCurrentSection();
  var currentArticle = '';
  if (currentSection !== 'index') {
    currentArticle = getCurrentArticle();
  }

  var input;

  const base = getWindowUrl();
  if (base === 'docs') {
    input = dom.section({className: 'section-search'},
      dom.form(null,
        dom.input({
          type: 'text',
          placeholder: 'search in ' + base,
          className: 'search-input',
          id: 'algolia-search'
        }),
        dom.img({src: '/images/icon-magnifier.svg', alt: 'search'})
        )
      );
  } else {
    input = renderSearch({base: base, data: props.data, setState: setState});
  }

  return dom.section({className: 'section-sidebar'},
    input,
    dom.section({className: 'sidebar-list'},
      createList(state.data, state.search, props.data, currentSection, currentArticle)
    )
  );
}

// transform data into a
// list of ui components
// [[str]], [[str]] -> [obj]
function createList (data, search, propdata, currentSection, currentArticle) {
  const base = getWindowUrl();
  var searchContent = (search === undefined) ? '' : search;

  return data.map((arr, i) => {
    const section = propdata[i][0];

    var header = null;
    var lis = [];
    var uri = null;
    var article = null;
    var j = 0;

    // first element could be the header
    if (arr.length && arr[0] === section) {
      uri = createHeadUri(base, section);
      header = renderHeadElement(stripFileExt(arr[0]), uri, section, currentSection);
      // Don't start for loop later at 0
      j++;
    }

    while (j < arr.length) {
      article = arr[j];
      uri = createUri(base, section, article);
      lis.push(renderLiElement(stripFileExt(article), uri, stripFileExt(currentArticle)));
      j++;
    }

    var className = 'closed';

    if (searchContent === '') {
      if (section === currentSection && section !== 'index') {
        className = 'open';
      }
    } else {
      className = 'open';
    }

    var nw = [];

    if (header) {
      nw.push(header);
    }
    if (lis.length) {
      nw.push(dom.ul({key: 'subarr' + i}, lis));
    }

    return renderSubListContainer('arr' + i, className, dom.li({key: 'arr_li'}, nw));
  });
}

// render a list heading element
// str, str -> obj
function renderHeadElement (str, uri, section, currentSection) {
  var className = 'sidebar-li';
  if (section === currentSection) {
    className += ' sidebar-li_active';
  }
  var params = {
    className: className,
    key: str,
    href: uri
  };
  return dom.a(params, str);
}

// render a li element
// str, str -> obj
function renderLiElement (str, uri, currentArticle) {
  var className = 'sidebar-li_sub';
  if (str === currentArticle) {
    className += ' sidebar-li_sub_active';
  }
  return dom.li({className: className, key: str + uri},
    dom.a({href: uri}, str)
  );
}

// render the sub list container
// str, [obj] -> obj
function renderSubListContainer (key, className, els) {
  return dom.ul({key: key, className: className}, els);
}

// clean file name
// str -> str
function stripFileExt (filename) {
  var name = filename.replace(/-/g, ' ');
  return name.split('.')[0];
}

// create href links for the sidebar
// str, str, str, -> str
function createUri (base, section, article) {
  article = article.split('.')[0];
  return '/' + base + '/' + section + '/' + article + '.html';
}

function createHeadUri (base, section) {
  return '/' + base + '/' + section + '/' + 'index.html';
}

// get the baseUrl from the window
// null -> str
function getWindowUrl () {
  var pathName = window.location.pathname.match(/\/\w+\//)[0];
  return pathName.split('/')[1];
}

// get the subUrl from the window
// null -> str
function getCurrentSection () {
  var pathName = window.location.pathname.match(/[^.]+/)[0];
  var section = pathName.split('/')[2];
  return section;
}

// get the articleUrl from the window
// null -> str
function getCurrentArticle () {
  var pathName = window.location.pathname.match(/[^.]+/)[0];
  var article = pathName.split('/')[3];
  return article;
}
