import 'package:flutter/material.dart';

//WILL BE LISTED IN THE POSTS LIST

class PostCard extends StatelessWidget {
  final String imgUrl, title;
  final VoidCallback onTap;
  const PostCard({
    super.key,
    required this.imgUrl,
    required this.title,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Card(
      elevation: 5, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10),), margin: const EdgeInsets.all(5),
      child: Column( crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Image.asset(
                imgUrl,
                height: 200,
                width: MediaQuery.of(context).size.width,
                fit: BoxFit.fill,
              )
            ),
          Padding(
            padding: const EdgeInsets.all(6),
            child: Text(
              title,
              maxLines: 2,
              style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w500),
            ),
          ),
          
        ],
      ),
      ),
    );
  }
  /*final String imgUrl, title;
  final VoidCallback onTap;
  final Map<String, dynamic> cut;

  const PostCard({
    super.key,
    required this.cut,
    required this.imgUrl,
    required this.title,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.brown.shade50,
      elevation: 4.0,
      margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16.0),
        title: Text(
          'Código: ${cut['code']}',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.brown.shade900,
          ),
        ),
        subtitle: Text(
          'Status: ${cut['status']}',
          style: const TextStyle(color: Colors.black87),
        ),
        onTap: onTap,
      ),
    );
  }*/
}