class BaseController < ApplicationController
  def home
    @words = Word.all.shuffle[0..3]
    @names = @words.shuffle.collect{|word| word.name}
    @posis = @words.shuffle.collect{|word| word.posi.to_s}
  end
end
