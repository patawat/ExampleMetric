library('modeltools')
library('archetypes')

#Load model
d1 = read.csv('~/Desktop/ExampleMetric/result.csv')
d2 = d1[1:20]
url = d1$Url
View(d2)

#pcplot(d2)

set.seed(1981)

#Create Archetypes
as <- stepArchetypes(d2, k = 1:15, verbose = FALSE, nrep = 3)
screeplot(as)

a3 <- bestModel(as[[4]])


#Get coefficients
cof <- coefficients(a3)
#cof
y <- data.frame(d1,cof)
write.table(y, file = '/Users/patawat/Desktop/ExampleMetric/Result/ResultFromR.csv', row.names=FALSE,col.names=TRUE,sep=",")



#nparameters(a3)

rss(as[2])

t(parameters(a3))

simplexplot(a3,labels_cex = 1,points_pch = 19 , show_labels = TRUE,
             show_direction = TRUE)
barplot(a3, d1, percentage = TRUE)

#Save model
save(a3, file = "my_model1.rda")
