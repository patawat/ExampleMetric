library('modeltools')
library('archetypes')

#Load model
d1 = read.csv('~/Desktop/ExampleMetric/result.csv')
d2 = d1[14:17]
url = d1$Url
View(d2)

#pcplot(d2)

set.seed(1981)

#Create Archetypes
as <- stepArchetypes(d2, k = 1:15, verbose = FALSE, nrep = 3)
screeplot(as)

a3 <- bestModel(as[[3]])
a4 <- bestModel(as[[4]])
a5 <- bestModel(as[[5]])
a6 <- bestModel(as[[6]])

#Get coefficients
cof <- coefficients(a3)
#cof
y <- data.frame(d1,cof)
write.table(y, file = '/Users/patawat/Desktop/ExampleMetric/Result/LOC-Analysis/ResultFromR3.csv', row.names=FALSE,col.names=TRUE,sep=",")

simplexplot(a3,labels_cex = 1,points_pch = 19 , show_labels = TRUE,
            show_direction = TRUE)
barplot(a3, d1, percentage = TRUE)

#Get coefficients
cof <- coefficients(a4)
#cof
y <- data.frame(d1,cof)
write.table(y, file = '/Users/patawat/Desktop/ExampleMetric/Result/LOC-Analysis/ResultFromR4.csv', row.names=FALSE,col.names=TRUE,sep=",")

simplexplot(a4,labels_cex = 1,points_pch = 19 , show_labels = TRUE,
            show_direction = TRUE)
barplot(a4, d1, percentage = TRUE)

#Get coefficients
cof <- coefficients(a5)
#cof
y <- data.frame(d1,cof)
write.table(y, file = '/Users/patawat/Desktop/ExampleMetric/Result/LOC-Analysis/ResultFromR5.csv', row.names=FALSE,col.names=TRUE,sep=",")
nparameters(a3)

simplexplot(a5,labels_cex = 1,points_pch = 19 , show_labels = TRUE,
            show_direction = TRUE)
barplot(a5, d1, percentage = TRUE)

#Get coefficients
cof <- coefficients(a6)
#cof
y <- data.frame(d1,cof)
write.table(y, file = '/Users/patawat/Desktop/ExampleMetric/Result/LOC-Analysis/ResultFromR6.csv', row.names=FALSE,col.names=TRUE,sep=",")

simplexplot(a6,labels_cex = 1,points_pch = 19 , show_labels = TRUE,
            show_direction = TRUE)
barplot(a6, d1, percentage = TRUE)

#nparameters(a3)

rss(as[2])

t(parameters(a3))

#simplexplot(a3,labels_cex = 1,points_pch = 19 , show_labels = TRUE,
#             show_direction = TRUE)
#barplot(a3, d1, percentage = TRUE)

#Save model
save(a3, file = "my_model1.rda")
