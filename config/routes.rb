Rails.application.routes.draw do
  root 'base#home'
  resources :words do
    collection do
      get :pull_words
    end
  end
end
