import React, { useState } from 'react'

function Header(props) {

  const [filterFlag, setFilterFlag] = useState(false);
  const [display, setDisplay] = useState('hidden')
  const [country, setCountry] = useState('in')
  const [language, setLanguage] = useState('en')
  const [category, setCategory] = useState('general')
  const [sortBy, setSortBy] = useState('relevance')
  const [query, setQuery] = useState('')

  const countryCodes = {
    Australia: 'au',
    Brazil: 'br',
    Canada: 'ca',
    China: 'cn',
    Egypt: 'eg',
    France: 'fr',
    Germany: 'de',
    Greece: 'gr',
    'Hong Kong': 'hk',
    India: 'in',
    Ireland: 'ie',
    Israel: 'il',
    Italy: 'it',
    Japan: 'jp',
    Netherlands: 'nl',
    Norway: 'no',
    Pakistan: 'pk',
    Peru: 'pe',
    Philippines: 'ph',
    Portugal: 'pt',
    Romania: 'ro',
    'Russian Federation': 'ru',
    Singapore: 'sg',
    Spain: 'es',
    Sweden: 'se',
    Switzerland: 'ch',
    Taiwan: 'tw',
    Ukraine: 'ua',
    'United Kingdom': 'gb',
    'United States': 'us'
  };

  const languageCodes = {
    Arabic: 'ar',
    Chinese: 'zh',
    Dutch: 'nl',
    English: 'en',
    French: 'fr',
    German: 'de',
    Greek: 'el',
    Hebrew: 'he',
    Hindi: 'hi',
    Italian: 'it',
    Japanese: 'ja',
    Malayalam: 'ml',
    Marathi: 'mr',
    Norwegian: 'no',
    Portuguese: 'pt',
    Romanian: 'ro',
    Russian: 'ru',
    Spanish: 'es',
    Swedish: 'sv',
    Tamil: 'ta',
    Telugu: 'te',
    Ukrainian: 'uk'
  };

  const categories = {
    General: "general",
    World: "world",
    Nation: "nation",
    Business: "business",
    Technology: "technology",
    Entertainment: "entertainment",
    Sports: "sports",
    Science: "science",
    Health: "health"
  };

  function handleFilterFlag() {

    setFilterFlag(!filterFlag)
    if (display === '') {
      setDisplay('hidden')
    } else {
      setDisplay('')
    }
  }

  function handleSearch() {


    let url = `https://gnews.io/api/v4/top-headlines?q=${query}&lang=${language}&country=${country}&sortby=${sortBy}&category=${category}&max=10&apikey=` + process.env.REACT_APP_NEWS_API;


    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let articles = data.articles;

        if(articles.length===0){
          alert("No article available according to your search! change your filters or query.")
          return;
        }
        props.setArticles(articles);
      });
  }

  function handleFilter(){

    handleFilterFlag();

    let url = `https://gnews.io/api/v4/top-headlines?q=${query}&lang=${language}&country=${country}&sortby=${sortBy}&category=${category}&max=10&apikey=` + process.env.REACT_APP_NEWS_API;


    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let articles = data.articles;

        if(articles.length===0){
          alert("No article available according to your search! change your filters or query.")
          return;
        }
        props.setArticles(articles);
      });

  }

  function handleQuery(q){

    q.trim();
    if(q===''){
      setQuery("None");
      return;
    } 

    let newQ = `"${q}"`;
    setQuery(newQ);
  }

  return (
    <div>
      <div className='flex flex-wrap gap-2 bg-cyan-900 text-white items-center font-semibold justify-between px-5 py-5 md:px-14'>
        <div>Acowale</div>
        <div className='flex flex-wrap gap-2'>
          <input onChange={(e) => handleQuery(e.target.value)} className='px-1 h-10 text-black rounded' type="text" placeholder='search anything...' />
          <button onClick={handleSearch} className='border border-white rounded w-20 h-10 hover:bg-white hover:text-black active:bg-slate-200'>Search</button>
        </div>
        <div>
          {filterFlag ?
            <button onClick={handleFilterFlag} className='border border-white rounded w-10 h-10 hover:bg-white hover:text-black active:bg-slate-200'>X</button>
            : <button onClick={handleFilterFlag} className='border border-white rounded w-20 h-10 hover:bg-white hover:text-black active:bg-slate-200'>Filter</button>}
        </div>
      </div>

      <div className={`flex flex-wrap gap-2 bg-cyan-900  items-center justify-end px-5 py-5 md:px-14 ${display}`}>

        <select className='rounded' onChange={(e) => setCountry(e.target.value)} value={country}>
          {Object.entries(countryCodes).map(([country, code]) => (
            <option key={code} value={code}>
              {country}
            </option>
          ))}
        </select>

        <select className='rounded' onChange={(e) => setLanguage(e.target.value)} value={language}>
          {Object.entries(languageCodes).map(([language, code]) => (
            <option key={code} value={code}>
              {language}
            </option>
          ))}
        </select>

        <select className='rounded' onChange={(e) => setCategory(e.target.value)} value={category}>
          {Object.entries(categories).map(([categoryK, categoryV]) => (
            <option key={categoryV} value={categoryV}>
              {categoryK}
            </option>
          ))}
        </select>

        <select className='rounded' onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="relevance">Relevance</option>
          <option value="publishedAt">Published At</option>
        </select>

        <button onClick={handleFilter} className='border border-white rounded w-20 h-10 hover:bg-white hover:text-black active:bg-slate-200 text-white font-semibold'>Filter</button>

      </div>
    </div>

  )
}

export default Header