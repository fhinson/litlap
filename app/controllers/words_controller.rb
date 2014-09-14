class WordsController < ApplicationController
  def pull_words
    @new_words = Word.all.shuffle[0..3]
    puts params[:oldnames]
    puts "hello"
    @new_names = @new_words.shuffle.collect{|word| word.name} - params[:oldnames]
    
    @new_posis = @new_words.shuffle.collect{|word| word.posi.to_s} - params[:oldposis]
    render json:[@new_names, @new_posis]
  end
end
