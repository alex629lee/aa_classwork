require "byebug"
class Node
  attr_reader :key
  attr_accessor :val, :next, :prev


  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end

  def remove
    # optional but useful, connects previous link to next link
    # and removes self from list.
  end
end

  # prev_node => Node => next_node 
  # node: @next = next_node or nil (if tail)
  #       @key = key,  @value = value
  #       @prev = prev_node or nil (if head)

class LinkedList
  include Enumerable

  attr_reader :head, :tail

  def initialize
    @head = Node.new 
    @tail = Node.new 
    @head.next = @tail 
    @tail.prev = @head 
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    @head.next
  end

  def last
    @tail.prev
  end

  def empty?
    @head.next == @tail 
  end

  def get(key)
    current_node = first 
    until current_node.key == key || current_node.next == nil
      current_node = current_node.next
    end
    if current_node.key == key 
      return current_node.val 
    else  
      nil 
    end 
  end

  def include?(key)
    current_node = first 
    until current_node.key == key || current_node.next == nil
      current_node = current_node.next
    end
    if current_node.key == key 
      return true
    end
    false
  end

  def append(key, val)
   node = Node.new(key, val)
   (@tail.prev).next = node 
   node.prev = @tail.prev 
   node.next = @tail 
   @tail.prev = node
  end


  def update(key, val)
    current_node = first 
    until current_node.key == key || current_node.next == nil
      current_node = current_node.next
    end
    current_node.val = val if current_node.key == key
  end

  def remove(key)
    current_node = first 
    until current_node.key == key || current_node.next == nil
      current_node = current_node.next
    end
    return nil if current_node.key != key 

    prev_node = current_node.prev 
    next_node = current_node.next 

    prev_node.next = next_node 
    next_node.prev = prev_node   
  end


  def each
    que = [self.first]
    
    until que.length == 0
      node = que.shift
      yield node 
      que << node.next if !node.next.nil? && node.next.val != nil 
    end
    
  end

  # Remember back to when you wrote Array#my_each, and let's get this thing
  # enumerating. The block passed to #each will yield to a node.

  # uncomment when you have `each` working and `Enumerable` included
  # def to_s
  #   inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  # end
end
