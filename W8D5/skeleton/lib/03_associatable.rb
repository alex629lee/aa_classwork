require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    class_name.constantize
  end

  def table_name
    model_class.table_name
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    foreign_key = name.to_s.downcase + "_id" 
    @foreign_key = options[:foreign_key] || foreign_key.to_sym
    @primary_key = options[:primary_key] || :id 
    @class_name = options[:class_name] || name.to_s.capitalize
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    foreign_key = self_class_name.to_s.downcase + "_id" 
    @foreign_key = options[:foreign_key] || foreign_key.to_sym
    @primary_key = options[:primary_key] || :id 
    @class_name = options[:class_name] || name.to_s.capitalize.singularize
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {}) #association_name, options_hash
    options = BelongsToOptions.new(name, options)

    define_method(name) do 
      foreign_key = options.send(:foreign_key)
      model_class = options.model_class
      
      models = model_class.where({id: self.attributes[foreign_key]})
      models.first
    end 
  end

  def has_many(name, options = {})
    # ...
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
  end
end

class SQLObject
  extend Associatable 
end
