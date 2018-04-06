let images = [
  require('../img/Image10.png'),
  require('../img/Image11.png'),
  require('../img/Image2.png'),
  require('../img/Image3.png'),
  require('../img/Image4.png'),
  require('../img/Image1.png'),
  require('../img/Image12.png'),
  require('../img/Image8.png'),
  require('../img/Image6.png'),
  require('../img/Image9.png'),
  require('../img/Image5.png'),
  require('../img/Image7.png'),
];

// const charityarticles = [{

//         "charityNavigatorURL": "https://www.charitynavigator.org/?bay=search.summary&orgid=5954&utm_source=DataAPI&utm_content=f0287ce6",
//         "mission": "The MDI Biological Laboratory is a rapidly growing, independent non-profit biomedical research institution. Its mission is to improve human health and well-being through basic research, education, and development ventures that transform discoveries into cures.",
//         "websiteURL": "http://www.mdibl.org/",
//         "tagLine": "Connecting Science, Environment, and Health",
//         "charityName": "Mount Desert Island Biological Laboratory",
//         "ein": "010202467",
//         "currentRating": {
//             "ratingImage": {
//                 "small": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4starsb.png",
//                 "large": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4stars.png"
//             },
//             "rating": 4
//         },
//         "category": {
//             "categoryName": "Research and Public Policy",
//             "categoryID": 11,
//             "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.categories&categoryid=11&utm_source=DataAPI&utm_content=f0287ce6",
//             "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/categories/research.png"
//         },
//         "cause": {
//             "causeID": 35,
//             "causeName": "Non-Medical Science & Technology Research",
//             "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.results&cgid=11&cuid=35&utm_source=DataAPI&utm_content=f0287ce6",
//             "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/causes/small/nonmedical.jpg"
//         },
//         "irsClassification": {
//             "deductibility": "Contributions are deductible",
//             "subsection": "501(c)(3)",
//             "nteeType": "Science and Technology Research Institutes, Services",
//             "foundationStatus": "Organization that normally receives no more than one-third of its support from gross investment income and unrelated business income and at the same time more than one-third of its support from contributions, fees, and gross receipts related to exempt purposes.  509(a)(2)",
//             "nteeSuffix": "0",
//             "nteeClassification": "Biological, Life Science Research",
//             "deductibilityDetail": null,
//             "nteeCode": "U50",
//             "nteeLetter": "U"
//         },
//         "mailingAddress": {
//             "country": null,
//             "stateOrProvince": "ME",
//             "city": "Bar Harbor",
//             "postalCode": "04609",
//             "streetAddress1": "159 Old Bar Harbor Road",
//             "streetAddress2": null
//         },
//         "donationAddress": {
//             "country": null,
//             "stateOrProvince": "ME",
//             "city": "Salisbury Cove",
//             "postalCode": "04672",
//             "streetAddress1": "PO Box 35",
//             "streetAddress2": null
//         },
//         "advisories": {
//             "severity": null,
//             "active": {
//                 "_rapid_links": {
//                     "related": {
//                         "href": "https://api.data.charitynavigator.org/v2/Organizations/010202467/Advisories?status=ACTIVE"
//                     }
//                 }
//             }
//         },
//         "organization": {
//             "charityName": "Mount Desert Island Biological Laboratory",
//             "ein": "010202467",
//             "charityNavigatorURL": "https://www.charitynavigator.org/?bay=search.summary&orgid=5954&utm_source=DataAPI&utm_content=f0287ce6",
//             "_rapid_links": {
//                 "related": {
//                     "href": "https://api.data.charitynavigator.org/v2/Organizations/010202467"
//                 }
//             }
//         }
//     },
//     {
//         "charityNavigatorURL": "https://www.charitynavigator.org/?bay=search.summary&orgid=12517&utm_source=DataAPI&utm_content=f0287ce6",
//         "mission": "Working with the communities we serve, the United Way of Eastern Maine is a trusted catalyst for meaningful and lasting change that improves the lives of people in our region. We improve lives by mobilizing the caring power of people and communities. We aim to achieve measurable results in three areas:\r\n\r\nEducation: Children are Ready to Learn and Safe After School\r\nIncome: Families Safe and Secure\r\nHealth: Seniors are Independent and Active",
//         "websiteURL": "http://www.unitedwayem.org",
//         "tagLine": "Live united",
//         "charityName": "United Way of Eastern Maine",
//         "ein": "010211478",
//         "currentRating": {
//             "ratingImage": {
//                 "small": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/3starsb.png",
//                 "large": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/3stars.png"
//             },
//             "rating": 3
//         },
//         "category": {
//             "categoryName": "Community Development",
//             "categoryID": 10,
//             "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.categories&categoryid=10&utm_source=DataAPI&utm_content=f0287ce6",
//             "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/categories/religion.png"
//         },
//         "cause": {
//             "causeID": 42,
//             "causeName": "United Ways",
//             "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.results&cgid=10&cuid=42&utm_source=DataAPI&utm_content=f0287ce6",
//             "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/causes/small/United_Way.gif"
//         },
//         "irsClassification": {
//             "deductibility": "Contributions are deductible",
//             "subsection": "501(c)(3)",
//             "nteeType": "Philanthropy, Voluntarism and Grantmaking Foundations",
//             "foundationStatus": "Organization which receives a substantial part of its support from a governmental unit or the general public   170(b)(1)(A)(vi)",
//             "nteeSuffix": "0",
//             "nteeClassification": "Fund Raising Organizations That Cross Categories",
//             "deductibilityDetail": null,
//             "nteeCode": "T70",
//             "nteeLetter": "T"
//         },
//         "mailingAddress": {
//             "country": null,
//             "stateOrProvince": "ME",
//             "city": "Bangor",
//             "postalCode": "04401",
//             "streetAddress1": "700 Main Street",
//             "streetAddress2": "Suite 1"
//         },
//         "advisories": {
//             "severity": null,
//             "active": {
//                 "_rapid_links": {
//                     "related": {
//                         "href": "https://api.data.charitynavigator.org/v2/Organizations/010211478/Advisories?status=ACTIVE"
//                     }
//                 }
//             }
//         },
//         "organization": {
//             "charityName": "United Way of Eastern Maine",
//             "ein": "010211478",
//             "charityNavigatorURL": "https://www.charitynavigator.org/?bay=search.summary&orgid=12517&utm_source=DataAPI&utm_content=f0287ce6",
//             "_rapid_links": {
//                 "related": {
//                     "href": "https://api.data.charitynavigator.org/v2/Organizations/010211478"
//                 }
//             }
//         }
//     }
// ];

let charityarticles = []

export default charityarticles