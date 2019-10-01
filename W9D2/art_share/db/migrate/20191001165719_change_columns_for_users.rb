class ChangeColumnsForUsers < ActiveRecord::Migration[6.0]
  def change 
    add_column :users, :username, :string, null: false
    remove_column :users, :name
    remove_column :users, :email
    
    add_index :users, :username, unique: true
  end
end

# add_index :table_name, :column_name, unique: true
# class Person < ActiveRecord::Base
#   validates_uniqueness_of :user_name
# end
