require_relative 'p04_linked_list'

class HashMap
  include Enumerable
  attr_accessor :count, :store

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    !get(key).nil?
  end

  def set(key, val)
    new_key = key.hash 
    bucket_idx = new_key % num_buckets 

    linked_list = @store[bucket_idx]
    
    linked_list.update(key, val)
    if !linked_list.include?(key)
      linked_list.append(key, val)
      @count += 1
    end
    if @count >= num_buckets 
      resize! 
    end 
  end

  def get(key)
    val = nil
    @store.each do |list|
      if list.include?(key)
        val = list.get(key) 
      end
      return val if !val.nil?
    end  
    nil
  end

  def delete(key)
    @store.each do |list|
      if list.include?(key) && key != nil
        list.remove(key)
        @count -= 1
        break
      end 
    end
  end

  def each(&prc)
    @store.each do |list|
      list.each do |node| 
        key = node.key 
        val = node.val 
        if key != nil && val != nil 
          prc.call(key, val)
        end 
      end 
    end 
  end

  # uncomment when you have Enumerable included
  # def to_s
  #   pairs = inject([]) do |strs, (k, v)|
  #     strs << "#{k.to_s} => #{v.to_s}"
  #   end
  #   "{\n" + pairs.join(",\n") + "\n}"
  # end

  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    @store.length
  end

  def resize!
    array = []
    @store.each do |list|
      list.each do |node|
        array << [node.key, node.val]
        self.delete(node.key) 
      end
    end
    
    @store += HashMap.new.store
    
    array.each do |pair|
      key, val = pair 
      if key != nil && val != nil 
        set(key, val)
      end 
    end 
  end

  def bucket(key)
  end
end
