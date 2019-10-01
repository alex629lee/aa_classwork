class RemoveIndexFromArtworks < ActiveRecord::Migration[6.0]
  def change
    remove_index :artworks, :artist_id

    add_index :artworks, :artist_id 
  end
end
