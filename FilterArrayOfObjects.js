/*
This array filter takes three arguments:
 - the `sourceArr` array
 - a pre-built `filterCriteria` array
 - an optional `returnProp` string

The function will return an array of objects from the source array that
meet ALL of the given criteria. To meet a criterion, an item must have a
property matching the criterion's `prop`, with a value matching ANY of
that criterion's `allowedVals`. (By default, the target property is
assumed to be a top-level property of the objects in the source array,
but you can specify another (top-level) property that the target
property is `nestedUnder`.)

It's up to you to insert criterion objects into `filterCriteria` before
calling the `filter` function. Each criterion object has these properties:
- a `prop` string 
- an `allowedVals` array (of strings)
- an optional `nestedUnder` string, indicating the parent of the criterion
  property

For example, you could make a filter based on just the "artist" property by setting a
`filterCriteria` array like:
*/
  let myFilterCriteria = [
    {
      prop: "artist",
      allowedVals: ["Common", "Mos Def"],
      nestedUnder: ""
    }
  ];

// And you would use it to get a list of song titles from a hypothetical `songlist` arrayvlike:
  `filterArray(songlist, myFilterCriteria, "title");`
 

// TODO: handle comparisons (`<` and `>`), take user input and populate filterCriteria, allow indefinite nesting 

// The filter function:
  function filterArray(sourceArr, filterCriteria, returnProp){
    const filtered = sourceArr.filter( (item, itemInd, items) =>
      filterCriteria.every( (criterion, criterionInd, criteria) =>
        (
          !criterion.nestedUnder &&
          item[criterion.prop] &&
          criterion.allowedVals.includes(item[criterion.prop])
        )
        ||
        (
          item[criterion.nestedUnder] &&
          item[criterion.nestedUnder][criterion.prop] &&
          criterion.allowedVals.includes(item[criterion.nestedUnder][criterion.prop])
        )
      )
    );
    
    return returnProp ? filtered.map(item => item[returnProp]) : filtered;
  }



  // A more complex example:
    let result = filterArray(getSourceArr(), getFilterCriteria(), "ProId");
    console.log(result);

    function getFilterCriteria(){
      return [
         { prop: "Ram", nestedUnder: "AttriValue", allowedVals: ["4 GB", "8 GB"] },
         { prop: "Internal Memory", nestedUnder: "AttriValue", allowedVals: ["64 GB", "128 GB and Above"] }
      ];
    }

    function getSourceArr(){
      return [
        { "ProId": 12, "ProName": "Samsung Galaxy A9", "AttriValue": { "ProductId": "12", "Internal Memory": "128 GB and Above", "Ram": "4 GB" } },
        { "ProId": 11, "ProName": "Vivo Y95 (Starry Black, 64 GB)  (4 GB RAM)", "AttriValue": { "ProductId": "11", "Internal Memory": "64 GB", "Ram": "8 GB" } },
        { "ProId": 10, "ProName": "OPPO A7", "AttriValue": { "ProductId": "10", "Internal Memory": "64 GB", "Ram": "6 GB" } }
      ];
    }
