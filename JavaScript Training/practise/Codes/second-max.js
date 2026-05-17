function secondMax(arr) {
    let first = -Infinity, second = -Infinity;
    for (const num of arr){
        if (num>first) {second = first; first = num;}
        else if (num > second && num !== first) {second = num;}
    }
    return second === -Infiity?null:second;
}

function secondMin(arr) { 

  let first = Infinity, second = Infinity; 

  for (const num of arr) { 

    if (num < first)        { second = first; first = num; } 

    else if (num < second && num !== first) { second = num; } 

  } 

  return second === Infinity ? null : second; 

} 