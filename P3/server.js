//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const snakeNames = require('snake-names');

const PUERTO = 9000;