class MaxIntSet
  # In this version of a set, we can only store integers that live in a
  # predefined range. So I tell you the maximum integer I'll ever want to store,
  # and you give me a set that can store it and any smaller non-negative number.
  
  # Sets dont have duplicate elements, 
  # Basic functions: include?, insert, delete 
  # ex.) {2,1,4,0} -> [ T, T, T, F, T ]
  #                     0, 1, 2, 3, 4 

  attr_accessor :store

  def initialize(max)
    raise "max can't be negative" if max < 0
    @store = Array.new(max)
  end

  def insert(num)
    raise "Out of bounds" if num > 50 || num < 0
    @store[num] = true
  end

  def remove(num)
    @store[num] = false
  end

  def include?(num)
    @store[num]
  end

  private

  def is_valid?(num)
  end

  def validate!(num)
  end
end

require "byebug"

class IntSet
  # To look up a number in the set, modulo (%) the number by the set's length,
  # and add it to the array at that index. 
  # bucket_num = num % @store_length 
  
  attr_accessor :store 
  
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    if !include?(num)
      @store[num % @store.length] << num
    end
  end

  def remove(num)
    if include?(num)
      @store[num % @store.length].delete(num)
    end
  end

  def include?(num)
    @store[num % @store.length].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_accessor :store
  attr_reader :count
  
  # This time, let's increase the number of buckets as the size of the set
  # increases. The goal is to have store.length > N at all times.

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    if !include?(num)
      @store[num % num_buckets] << num
      @count += 1 
      resize! if @count >= num_buckets
    end
  end

  def remove(num)
    if include?(num)
      @store[num % num_buckets].delete(num)
      @count -= 1
    end
  end

  def include?(num)
    @store[num % num_buckets].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end

  def resize!
    array = []
    @store.each do |arr|
      arr.each do |num|
        array << num
        self.remove(num) 
      end
    end
    
    @store += ResizingIntSet.new.store
    
    array.each do |num|
      self.insert(num)    
    end 
  end
end
