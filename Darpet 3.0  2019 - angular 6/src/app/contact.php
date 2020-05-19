<?php 
//headers
    header ("Acces-Control-Allow-Origin: *");
    header ("Content-type: application/json");
    header()

    //collect post data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    // var_dump($request);

    //clean post data
    $name = $request->name;
    $email = $request->email;
    $message = $request->message;

    //create email
    $to = "darpetdev@localhost"; 
    $email_subject = "Message from contact form on Darpetdev:" .$name;
    $email_body = "This is automated email from Darpetdev with the following message \n\n"
    . "Name of the person" .$name
    . "\n\n Email address:" .$email
    . "\n\n Message: ".$message;

    $headers = "From: darpetdev@localhost";

    //send email
    //mail($to, $email_subject, $email_body, $headers);

    //post success or failure
    if( mail($to, $email_subject, $email_body, $headers)){
    	echo json_encode("Success")
    } else {
    	echo json_encode("Failure");
    }








/*
    if(isset($_POST['Send'])){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
        
        $mailto = "darpet@darpetdev.com";
        $headers = "From: ".$email;
        $txt = "You have received an e-mail from: " .$name.".\n\n".$message;
        
        
        mail($mailto, $txt, $headers);
        header("Location: http://www.darpetdev.com?mailsent");
        
    } else {
        echo "Something went wrong";
    }

    */



    ?>