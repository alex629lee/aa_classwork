class CreateArtworks < ActiveRecord::Migration[6.0]
  def change
    create_table :artworks do |t|
      t.string :title, null: false
      t.string :image_url, null: false
      t.integer :artist_id, null: false
    end
    add_index :artworks, [:title, :artist_id], unique: true
    add_index :artworks, :artist_id, unique: true
  end
end

