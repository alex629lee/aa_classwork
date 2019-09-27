require_relative 'db_connection'
require_relative '02_searchable.rb'
require 'active_support/inflector'
require 'byebug'

# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.
# extend Searchable
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

    result = DBConnection.execute(<<-SQL)
      SELECT 
        * 
      FROM 
        '#{@table_name}'
    SQL

    self.parse_all(result)
    #[{"id"=>1, "name"=>"Breakfast", "owner_id"=>1}, {"id"=>2, "name"=>"Earl", "owner_id"=>2}]
  end

  def self.parse_all(results)
    results.map do |result| 
      keys, vals= result.keys, result.values
      new_hash = Hash.new 
      keys.map! {|el| el.to_sym}
      (0...keys.length).each { |i| new_hash[keys[i]] = vals[i] }

      self.new(new_hash)
    end 
  end

  def self.find(id)
    result = DBConnection.execute(<<-SQL, id)
      SELECT 
        *
      FROM 
        '#{@table_name}'
      WHERE 
        id = ? 
    SQL
    return nil if result == [] 

    parsed = self.parse_all(result)
    parsed.first
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
    # {name: "Gizmo"}
    vals = [] 
    @attributes.each { |k,v| vals << v }
    vals 
  end

  def insert
    col_names = self.class.columns.drop(1).map(&:to_s).join(',')
    num_q_marks = self.class.columns.length 
    question_marks = Array.new(num_q_marks - 1) {'?'}
    question_marks = question_marks.join(',')
    
  
    attr_vals = attribute_values
    
    DBConnection.execute(<<-SQL, *attr_vals)
      INSERT INTO 
        #{self.class.table_name} (#{col_names}) 
      VALUES
        (#{question_marks})
    SQL
    self.id = DBConnection.last_insert_row_id
    
  end

  def update
    col_names = self.class.columns.drop(1).map(&:to_s)
    col_names = col_names.map { |col| col + " = ?" }.join(',')
    attr_vals = attribute_values.drop(1)

    DBConnection.execute(<<-SQL, *attr_vals, @attributes[:id])
      UPDATE 
        #{self.class.table_name}
      SET
        #{col_names}
      WHERE
        id = ?
    SQL
  end


  def save
    attributes
    if @attributes[:id].nil?
      insert 
    else  
      update 
    end 
  end
end
