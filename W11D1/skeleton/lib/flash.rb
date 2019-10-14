require 'json'

class Flash
  
  def initialize(req)
    @req = req
    cookie = req.cookies["_rails_lite_app_flash"]
    @now = cookie ? JSON.parse(cookie) : {}
    @flash = {}
  end 

  attr_reader :now

  def [](key)
    @now[key.to_s] || @flash[key.to_s]
  end 

  def []=(key, val)
    @flash[key.to_s] = val
  end

  def store_flash(res)
    res.set_cookie("_rails_lite_app_flash", value: @flash.to_json, path: '/')
  end 
end
