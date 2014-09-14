class BaseController < ApplicationController
  def home
    @words = Word.all.where(difficulty:1).shuffle[0..3]
    @names = @words.shuffle.collect{|word| word.name}
    @posis = @words.shuffle.collect{|word| word.posi.to_s}
  end
end
