const twoSum = (nums, target)=>{
    let hash = {};
    for(let i =0 ; i< nums.length; i++){
        let complement = target - nums[i];
        if(complement in hash){
            return [hash[complement],i];
        }
        hash[nums[i]] = i;
    }
    return [];
}

const res = twoSum([1,2,3,4,5,6],11);
console.log(res);


let x = (nums, target)=>{
    let left = 0, right = nums.length - 1 ;
    while(left < right){
        let curr_sum = nums[left] + nums[right];
        if (curr_sum === target){
            return [left, right];
        } else if(curr_sum > target){
            right--;
        } else {
            left++;
        }
    }
    return [];
}