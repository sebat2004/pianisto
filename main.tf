terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"

    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  profile = "keysight_tf_profile"
  region  = "us-west-2"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# Subnets
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "Main"
  }
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"

  tags = {
    Name = "Main"
  }
}

# API Gateway
resource "aws_apigatewayv2_api" "example" {
  name          = "pianisto-http-api"
  protocol_type = "HTTP"
}



