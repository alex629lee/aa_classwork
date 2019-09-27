require_relative 'db_connection'
require_relative '01_sql_object'


# haskell_cats = Cat.where(:name => "Haskell", :color => "calico")
# SELECT
#   *
# FROM
#   cats
# WHERE
#   name = ? AND color = ?

module Searchable
  def where(params)
    keys = params.keys 
    vals = params.values 
    keys.map! { |k| k.to_s + " = ?"}
    where_line = keys.join(" AND ")


    result = DBConnection.execute(<<-SQL, vals)
      SELECT 
        *
      FROM 
        #{self.table_name}
      WHERE 
        #{where_line}
    SQL

    self.parse_all(result)
  end
end

class SQLObject
  extend Searchable
end
