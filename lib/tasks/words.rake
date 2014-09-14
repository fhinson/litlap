namespace :inject do
  task :all_words => :environment do
    word_list = ["apple","baby","backpack","ball","bank","bar","baseball","bat","bear","bird","boat","book","bread","car","cat","chair","children","cigarette","city","cloud","computer","corn","cow","desk","dog","door","drawer","dress","duck","egg","fire","fish","flower","grass","hat","lamp","milk","money","paper","pants","pencil","shirts","shoes","stairs","television","tree","wallet","window","zebra","anger","beauty","capitol","bottom","forest","chief","continent","country","crowd","downtown","double","danger","dance","dream","engine",",nergy","furniture","feast","hydrant","island","rainstorm","quicksand","exchange","button","brain","faucet","hospital","gym","jail","jellyfish","fireman","police","goldfish","match","muscle","owl","number","party","toothbrush" ,"toothpaste","toilet","swim","store","umbrella","vegetable","volcano","wine","wrench"]
    difficulty_list = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    word_list.each_with_index do |word, index|
      Word.create(name:word, posi:index+1, difficulty:difficulty_list[index])
      puts "created " + (index+1).to_s + " words"
    end
  end
end