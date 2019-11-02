json.extract! @guest, :name, :age, :favorite_color

json.set! :gifts, @guest.gifts

# localhost:3000/api/guests/1