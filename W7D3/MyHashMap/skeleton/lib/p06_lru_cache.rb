require_relative 'p05_hash_map'
require_relative 'p04_linked_list'

class LRUCache
  def initialize(max, prc)
    @map = HashMap.new
    @store = LinkedList.new
    @max = max
    @prc = prc
  end

  # { "mario" =>    mario_node  #mario_node.next -> bowser_node 
  #   "bowser" =>   bowser_node  
  #   "goomba" =>   goomba_node 
  # }


  def count
    @map.count
  end

  def get(key)
    if !@store.include?(key) 
      @prc.call(key)
    end
  end

  def to_s
    'Map: ' + @map.to_s + '\n' + 'Store: ' + @store.to_s
  end

  private

  def calc!(key)
    # suggested helper method; insert an (un-cached) key
  end

  def update_node!(node)
    # suggested helper method; move a node to the end of the list
  end

  def eject!
  end
end
