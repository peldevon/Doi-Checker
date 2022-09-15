import { useEffect, useState } from "react";
import "./app.css";
import axios from "axios";

//////////////////////BASIC SEARCH

// function App() {
//   const [query, setQuery] = useState("");
//   return (
//     <div className="app">
//       <input
//         className="search"
//         placeholder="Search..."
//         onChange={(e) => setQuery(e.target.value.toLowerCase())}
//       />
//       <ul className="list">
//         {Users.filter((asd) =>
//           asd.first_name.toLowersCase().includes(query)
//         ).map((user) => (
//           <li className="listItem" key={user.id}>
//             {user.first_name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

///////////////////////SEARCH ON A DATATABLE

// function App() {
//   const [query, setQuery] = useState("");
//   const keys = ["first_name", "last_name", "email"];
//   const search = (data) => {
//     return data.filter((item) =>
//       keys.some((key) => item[key].toLowerCase().includes(query))
//     );
//   };
// return (
//   <div className="app">
//       <input
//         className="search"
//         placeholder="Search..."
//         onChange={(e) => setQuery(e.target.value.toLowerCase())}
//       />
//     {<Table data={Search(Users)} />}
//   </div>
// );
// }


////////////////////// API SEARCH from crossref api

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.crossref.org/works/${query}`
      );
      console.log(result.data.message)
      setData(result.data.message);
    } catch (error) {   
      setError(error);
    }
    setLoading(false);
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setError(null);
  //     setLoading(true);
  //     try {
  //       const result = await axios.get(
  //         `https://api.crossref.org/works?query=${query}`
  //       );
  //       console.log(result.data.message.items)
  //       setData(result.data.message.items);
  //     } catch (error) {   
  //       setError(error);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [query]);

  return (
    <div className="app">
          // create a search bar
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) =>setQuery(e.target.value.toLowerCase())}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <div>Something went wrong ...</div>}
      {loading ? (
        <div>Loading ...</div>
      ) : 
      // create a table with the data from the api showing the title, author, and doi
      (
        <div className="row">
        <div className="col-6">
          <span> DOI: </span>{data?.DOI}
        </div>
          <div className="col-6">
            <span> Title: </span>{data?.title}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;

// const x = {
//   "indexed": {
//       "date-parts": [
//           [
//               2022,
//               4,
//               3
//           ]
//       ],
//       "date-time": "2022-04-03T01:45:52Z",
//       "timestamp": 1648950352410
//   },
//   "reference-count": 16,
//   "publisher": "Institute of Electrical and Electronics Engineers (IEEE)",
//   "issue": "10",
//   "license": [
//       {
//           "start": {
//               "date-parts": [
//                   [
//                       1998,
//                       1,
//                       1
//                   ]
//               ],
//               "date-time": "1998-01-01T00:00:00Z",
//               "timestamp": 883612800000
//           },
//           "content-version": "vor",
//           "delay-in-days": 0,
//           "URL": "https://ieeexplore.ieee.org/Xplorehelp/downloads/license-information/IEEE.html"
//       }
//   ],
//   "content-domain": {
//       "domain": [],
//       "crossmark-restriction": false
//   },
//   "short-container-title": [
//       "IIEEE Trans. Software Eng."
//   ],
//   "published-print": {
//       "date-parts": [
//           [
//               1998
//           ]
//       ]
//   },
//   "DOI": "10.1109/32.729691",
//   "type": "journal-article",
//   "created": {
//       "date-parts": [
//           [
//               2002,
//               8,
//               24
//           ]
//       ],
//       "date-time": "2002-08-24T23:09:11Z",
//       "timestamp": 1030230551000
//   },
//   "page": "889-902",
//   "source": "Crossref",
//   "is-referenced-by-count": 19,
//   "title": [
//       "\"On-the-fly\" solution techniques for stochastic Petri nets and extensions"
//   ],
//   "prefix": "10.1109",
//   "volume": "24",
//   "author": [
//       {
//           "given": "D.D.",
//           "family": "Deavours",
//           "sequence": "first",
//           "affiliation": []
//       },
//       {
//           "given": "W.H.",
//           "family": "Sanders",
//           "sequence": "additional",
//           "affiliation": []
//       }
//   ],
//   "member": "263",
//   "reference": [
//       {
//           "key": "bibe088916",
//           "article-title": "on the multilevel adaptive iterative method",
//           "author": "r�de",
//           "year": "1992",
//           "journal-title": "Preliminary Proc Second Copper Mountain Conf Iterative Methods"
//       },
//       {
//           "key": "bibe088915",
//           "article-title": "adaptive relaxation for the steady-state analysis of markov chains",
//           "author": "horton",
//           "year": "1994"
//       },
//       {
//           "key": "bibe08896",
//           "doi-asserted-by": "publisher",
//           "DOI": "10.1109/PNPM.1995.524315"
//       },
//       {
//           "key": "bibe088914",
//           "doi-asserted-by": "publisher",
//           "DOI": "10.1007/978-1-4615-2241-6_32"
//       },
//       {
//           "key": "bibe08895",
//           "doi-asserted-by": "crossref",
//           "first-page": "258",
//           "DOI": "10.1007/3-540-58152-9_15",
//           "article-title": "superposed generalized stochastic petri nets: definition and efficient solution",
//           "author": "donatelli",
//           "year": "1994",
//           "journal-title": "Application and Theory of Petri Nets 1994 Proc 15th Int l Conf Application and Theory of Petri Nets"
//       },
//       {
//           "key": "bibe08894",
//           "author": "stewart",
//           "year": "1994",
//           "journal-title": "Introduction to the Numerical Solution of Markov Chains"
//       },
//       {
//           "key": "bibe088913",
//           "first-page": "141",
//           "article-title": "automatic generation and analysis of markov reward models using stochastic reward nets",
//           "author": "ciardo",
//           "year": "1993",
//           "journal-title": "Linear Algebra Markov Chains and Queueing Models"
//       },
//       {
//           "key": "bibe08893",
//           "doi-asserted-by": "publisher",
//           "DOI": "10.1109/32.99196"
//       },
//       {
//           "key": "bibe088912",
//           "first-page": "215",
//           "article-title": "performability modeling with stochastic activity networks",
//           "author": "movaghar",
//           "year": "1984",
//           "journal-title": "Proc 1984 Real-Time Systems Symp"
//       },
//       {
//           "key": "bibe088911",
//           "first-page": "106",
//           "article-title": "stochastic activity networks: structure, behavior, and application",
//           "author": "meyer",
//           "year": "1985",
//           "journal-title": "Proc Int l Workshop Timed Petri Nets"
//       },
//       {
//           "key": "bibe08899",
//           "first-page": "61",
//           "article-title": "advances in compositional approaches based on kronecker algebra: application to the study of manufacturing systems",
//           "author": "ciardo",
//           "year": "1996",
//           "journal-title": "Proc Third Int l Workshop Performability Modeling of Computer and Comm Systems"
//       },
//       {
//           "key": "bibe088910",
//           "author": "ajmone marsan",
//           "year": "1995",
//           "journal-title": "Modeling with Generalized Stochastic Petri Nets"
//       },
//       {
//           "key": "bibe08898",
//           "article-title": "on the use of kronecker operators for the solution of generalized stochastic petri nets",
//           "author": "ciardo",
//           "year": "1996"
//       },
//       {
//           "key": "bibe08897",
//           "doi-asserted-by": "publisher",
//           "DOI": "10.1109/32.541433"
//       },
//       {
//           "key": "bibe08891",
//           "doi-asserted-by": "publisher",
//           "DOI": "10.1109/PNPM.1989.68539"
//       },
//       {
//           "key": "bibe08892",
//           "doi-asserted-by": "publisher",
//           "DOI": "10.1109/49.64901"
//       }
//   ],
//   "container-title": [
//       "IEEE Transactions on Software Engineering"
//   ],
//   "link": [
//       {
//           "URL": "http://xplorestaging.ieee.org/ielx4/32/15729/00729691.pdf?arnumber=729691",
//           "content-type": "unspecified",
//           "content-version": "vor",
//           "intended-application": "similarity-checking"
//       }
//   ],
//   "deposited": {
//       "date-parts": [
//           [
//               2021,
//               11,
//               29
//           ]
//       ],
//       "date-time": "2021-11-29T20:05:49Z",
//       "timestamp": 1638216349000
//   },
//   "score": 1,
//   "resource": {
//       "primary": {
//           "URL": "http://ieeexplore.ieee.org/document/729691/"
//       }
//   },
//   "issued": {
//       "date-parts": [
//           [
//               1998
//           ]
//       ]
//   },
//   "references-count": 16,
//   "journal-issue": {
//       "issue": "10"
//   },
//   "URL": "http://dx.doi.org/10.1109/32.729691",
//   "ISSN": [
//       "0098-5589"
//   ],
//   "issn-type": [
//       {
//           "value": "0098-5589",
//           "type": "print"
//       }
//   ],
//   "subject": [
//       "Software"
//   ],
//   "published": {
//       "date-parts": [
//           [
//               1998
//           ]
//       ]
//   }
// }