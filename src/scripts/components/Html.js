import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

class Html extends React.Component {
  render() {
    const { store, component } = this.props;
    const head = Helmet.rewind();

    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          {Object.keys(this.props.assets.styles).map((style, i) =>
            <link href={this.props.assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>)}
          <style id="fonts" />
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{__html: component}} />

            <script
              dangerouslySetInnerHTML={{
                __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                ga('create', 'UA-8496014-1', 'auto');
                `
              }}
              charSet="UTF-8"
            />
            {/* SEO: https://developers.google.com/structured-data/slsb-overview#markup_examples */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
              __html: `{
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "http://quran.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "http://quran.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }`
            }} />
            {/* SEO: https://developers.google.com/structured-data/site-name#markup_requirements */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
              __html: `{
                "@context" : "http://schema.org",
                "@type" : "WebSite",
                "name" : "Quran",
                "alternateName" : "Quran.com",
                "url" : "http://quran.com"
              }`
            }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{
              __html: `{
                "@context": "http://schema.org",
                "@type": "Organization",
                "url": "http://quran.com",
                "logo": "http://quran.com/images/thumbnail.png"
              }`
            }} />
            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
            {Object.keys(this.props.assets.javascript).map((script, i) =>
              <script src={this.props.assets.javascript[script]} key={i}/>
            )}
        </body>

      </html>
    );
  }
}

export default Html;
