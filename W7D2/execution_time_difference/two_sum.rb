# Given an array of unique integers and a target sum, determine
# whether any two integers in the array sum to that amount.


# Let's start by implementing the brute force solution. Write a method called
# bad_two_sum?, which checks every possible pair.

def bad_two_sum?(array, target)
  array.each_with_index do |el1, i|
    break if i == array.length - 1
    array[i+1..-1].each do |el2|
      return true if el1 + el2 == target 
    end
  end
  false
end 

# arr = [0, 1, 5, 7]
# p bad_two_sum?(arr, 6) # => should be true
# p bad_two_sum?(arr, 10) # => should be false





# Write a second solution, called okay_two_sum?, which uses sorting.
def okay_two_sum?(array, target)
  sorted = array.sort 

  mid = array[array.length / 2]
  case mid <=> (target - mid)
  when 0 || -1 

  end 
end 
# arr = [0, 1, 5, 7]
# two_sum?(arr, 6) # => should be true
# two_sum?(arr, 10) # => should be false




