namespace :inject do
  task :all_words => :environment do
    word_list = ["apple","baby","backpack","ball","bank","bar","baseball","bat","bear","bird","boat","book","bread","car","cat","chair","children","cigarette","city","cloud","computer","corn","cow","desk","dog","door","drawer","dress","duck","egg","fire","fish","flower","grass","hat","lamp","milk","money","pants","paper","pencil","shirts","shoes","stairs","television","tree","wallet","window","zebra"]
    word_list.each_with_index do |word, index|
      Word.create(name:word, posi:index+1)
    end
  end
end