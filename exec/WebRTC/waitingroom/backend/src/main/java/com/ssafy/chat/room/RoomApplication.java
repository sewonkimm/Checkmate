package com.ssafy.chat.room;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RoomApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(RoomApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
		pbeEnc.setAlgorithm("PBEWithMD5AndDES");
		pbeEnc.setPassword("checkmate");
	}
}
