# Given a list of integers find the smallest number in the list.
    # list = [ 0, 3, 5, 4, -5, 10, 1, 90 ]
    # my_min(list)  # =>  -5

def my_min_phase_1(array) #=> O(n^2)
  smallest = array.first
  array.each_with_index do |el1, i|
    small = el1 
    array.each_with_index do |el2, j|
      if i < j
        if el2 < el1
          small = el2
        end
      end
      smallest = small if small < smallest
    end 
  end
  smallest
end 

def my_min_phase_2(array)
    smallest = array.first 
    array.each do |el| 
        smallest = el if el < smallest 
    end 
    smallest
end

# List = [ 0, 3, 5, 4, -5, 10, 1, 90 ]
# p my_min_phase_1(List)
# p my_min_phase_2(List)


# Largest Contiguous Sub-sum
# You have an array of integers and you want to find the largest
# contiguous (together in sequence) sub-sum.
# Find the sums of all contiguous sub-arrays and return the max.

def largest_contiguous_subsum1(array)
    start = 0 
    max = nil 
    while start < array.length 
        fin = 0 
        while fin < array.length 
            sub_arr = array[start..fin] 
            sum = sub_arr.sum 
            if !max || max < sum 
                max = sum 
            end 
            fin += 1
        end 
        start += 1
    end 
    max
end

# list = [5, 3, -7]
# p largest_contiguous_subsum(list) # => 8
# possible sub-sums
# [5]           # => 5
# [5, 3]        # => 8 --> we want this one
# [5, 3, -7]    # => 1
# [3]           # => 3
# [3, -7]       # => -4
# [-7]          # => -7


def largest_contiguous_subsum2(array)
  temp_sum = 0
  max_sum = 0
  i = 0
  while i < array.length 
    temp_sum += array[i]
    max_sum = temp_sum if temp_sum > max_sum
    temp_sum = 0 if temp_sum < 0
    i += 1
  end
  
  max_sum 
end

# list = [2, 3, -6, 7, -6, 7]
# p largest_contiguous_subsum2(list) # => 8 (from [7, -6, 7])
