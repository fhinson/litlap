class WordsController < ApplicationController
  def pull_words
    old_words = (JSON.parse(params[:oldposis]).to_a).collect{|posi| (Word.where(posi:posi).first)}
    @new_words = (Word.all.shuffle - old_words)[0..3]
    @new_names = (@new_words.collect{|word| word.name})
    @new_posis = (@new_words.collect{|word| word.posi.to_s})
    render json:[@new_names, @new_posis]
  end
end
