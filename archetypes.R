library('modeltools')
library('archetypes')

d1 = read.csv('~/Desktop/ExampleMetric/result.csv')
url = d1$Url
#d1 <- d1$no
#d1[is.na(d1)] <- 0
#d1[d1$Rule5 == '', ] <- 0
#d1$Rule5 <- as.numeric(d1$Rule5)
#d2 <- d1[1:10, ]
View(d1)

#d3 = read.csv('~/Desktop/Test4.csv')
#d3[is.na(d1)] <- 0
#d3[d1$Rule5 == '', ] <- 0
#d3$Rule5 <- as.numeric(d3$Rule5)
#d4 <- d3[1:1, ]
#View(d4)

pcplot(d1)

set.seed(1981)

as <- archetypes(d1, 3)

#as <- stepArchetypes(d1, k = 1:15, verbose = FALSE, nrep = 3)
screeplot(as)
a3 <- bestModel(as[[3]])

cof <- coefficients(a3)
#x <- data.frame(d1,url)
y <- data.frame(d1,cof)
#write.csv(cof, file = "foo.csv")

write.table(y, file = 'Desktop/foo.csv', row.names=FALSE,col.names=TRUE,sep=",")


nparameters(a3)
rss(as[2])
a3

#t(atypes(a3))
t(parameters(a3))

simplexplot(a3,labels_cex = 1,points_pch = 19 , show_labels = TRUE,
             show_direction = TRUE)
xyplot(a3,d1)
barplot(a3, d1, percentage = TRUE)
#pcplot(a3, d1, data.col = as.numeric(skel$Gender))
predict(a3, d4)
save(a3, file = "my_model1.rda")