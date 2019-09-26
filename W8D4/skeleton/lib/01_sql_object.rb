require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  
  def self.columns

    @columns ||= DBConnection.execute2(<<-SQL)
        SELECT
          *
        FROM
          '#{self.table_name}'
      SQL
      .first.map!{|el|el.to_sym}

  end
                # Cat.columns => [:id, :name, :owner_id]
                # Human.columns => [:id, :fname, :lname, :house_id]
  def self.finalize!  # @attributes = {id: "", } 
    self.columns

    @columns.each do |column|
      define_method(column) do   
        @attributes[column] ||= nil 
      end 

      define_method("#{column}=") do |val| 
        self.attributes[column] = val 
      end 
    end 
  end

  def self.table_name=(table_name)
    @table_name = table_name 
  end

  # .read cats.sql

  def self.table_name # @table_name
    @table_name ||= self.name.to_s.tableize 
  end

  def self.all
    # ...
  end

  def self.parse_all(results)
    # ...
  end

  def self.find(id)
    # ...
  end

  

  def initialize(params = {})
    columns = self.class.columns
    params.keys.each { |param| raise "unknown attribute '#{param}'" unless columns.include?(param) }

    self.class.finalize!  
    
    params.each do |k,v| 
      method_name = k.to_s + "=" 
      self.send(method_name, v)
    end 
    
  end

  def attributes
    @attributes ||= {} 
  end

  def attribute_values
    # ...
  end

  def insert
    # ...
  end

  def update
    # ...
  end

  def save
    # ...
  end
end
