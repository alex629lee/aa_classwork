require 'erb'

class ShowExceptions
  attr_reader :app 
  
  def initialize(app)
    @app = app
  end

  def call(env)
    begin
      app.call(env)
    rescue Exception => e
      render_exception(e)
    end
  end

  private

  def render_exception(e)
    dir = File.dirname(__FILE__)
    file = File.join(dir, "templates", "rescue.html.erb")
    template = File.read(file)
    body = ERB.new(template).result(binding)
    ['500', {'Content-type' => 'text/html'}, body]
  end

end
